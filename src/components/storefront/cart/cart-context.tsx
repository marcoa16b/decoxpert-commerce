"use client";

import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
  useSyncExternalStore,
} from "react";

export type CartItem = {
  id: string;
  productId: number;
  slug: string;
  title: string;
  variantLabel: string | null;
  imageUrl: string | null;
  unitPrice: number;
  installation: boolean;
  installationPrice: number;
  quantity: number;
};

export type StoreSettings = {
  whatsappNumber: string;
  whatsappDefaultMessage: string | null;
  cartHeaderMessage: string | null;
  cartFooterMessage: string | null;
};

type CartContextValue = {
  items: CartItem[];
  count: number;
  subtotal: number;
  installationTotal: number;
  total: number;
  isOpen: boolean;
  settings: StoreSettings;
  customerName: string;
  setCustomerName: (name: string) => void;
  setOpen: (open: boolean) => void;
  openCart: () => void;
  closeCart: () => void;
  add: (item: Omit<CartItem, "quantity">, quantity?: number) => void;
  remove: (id: string) => void;
  setQuantity: (id: string, quantity: number) => void;
  clear: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

const STORAGE_KEY = "decoxpert-cart-v1";
const NAME_STORAGE_KEY = "decoxpert-cart-name-v1";
const EMPTY: CartItem[] = [];

function readCustomerName(): string {
  if (typeof window === "undefined") return "";
  try {
    return window.localStorage.getItem(NAME_STORAGE_KEY) ?? "";
  } catch {
    return "";
  }
}

let cache: CartItem[] | null = null;
const listeners = new Set<() => void>();

function read(): CartItem[] {
  if (typeof window === "undefined") return EMPTY;
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    return raw ? (JSON.parse(raw) as CartItem[]) : EMPTY;
  } catch {
    return EMPTY;
  }
}

function subscribe(listener: () => void): () => void {
  listeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === STORAGE_KEY) {
      cache = read();
      listeners.forEach((entry) => entry());
    }
  };

  window.addEventListener("storage", onStorage);
  return () => {
    listeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getSnapshot(): CartItem[] {
  if (cache === null) cache = read();
  return cache;
}

function getServerSnapshot(): CartItem[] {
  return EMPTY;
}

function write(next: CartItem[]) {
  cache = next;
  try {
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  } catch {
    // ignore quota errors
  }
  listeners.forEach((entry) => entry());
}

let nameCache: string | null = null;
const nameListeners = new Set<() => void>();

function subscribeName(listener: () => void): () => void {
  nameListeners.add(listener);

  const onStorage = (event: StorageEvent) => {
    if (event.key === NAME_STORAGE_KEY) {
      nameCache = readCustomerName();
      nameListeners.forEach((entry) => entry());
    }
  };

  window.addEventListener("storage", onStorage);
  return () => {
    nameListeners.delete(listener);
    window.removeEventListener("storage", onStorage);
  };
}

function getNameSnapshot(): string {
  if (nameCache === null) nameCache = readCustomerName();
  return nameCache;
}

function getServerNameSnapshot(): string {
  return "";
}

function writeName(value: string) {
  nameCache = value;
  try {
    window.localStorage.setItem(NAME_STORAGE_KEY, value);
  } catch {
    // ignore quota errors
  }
  nameListeners.forEach((entry) => entry());
}

export function CartProvider({
  children,
  settings,
}: {
  children: React.ReactNode;
  settings: StoreSettings;
}) {
  const items = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
  const [isOpen, setIsOpen] = useState(false);
  const customerName = useSyncExternalStore(
    subscribeName,
    getNameSnapshot,
    getServerNameSnapshot,
  );

  const setCustomerName = useCallback((value: string) => {
    writeName(value);
  }, []);

  const add = useCallback((item: Omit<CartItem, "quantity">, quantity = 1) => {
    const current = getSnapshot();
    const existing = current.find((entry) => entry.id === item.id);
    const next = existing
      ? current.map((entry) =>
          entry.id === item.id
            ? { ...entry, quantity: entry.quantity + quantity }
            : entry,
        )
      : [...current, { ...item, quantity }];
    write(next);
  }, []);

  const remove = useCallback((id: string) => {
    write(getSnapshot().filter((entry) => entry.id !== id));
  }, []);

  const setQuantity = useCallback((id: string, quantity: number) => {
    write(
      getSnapshot().map((entry) =>
        entry.id === id ? { ...entry, quantity: Math.max(1, quantity) } : entry,
      ),
    );
  }, []);

  const clear = useCallback(() => write([]), []);

  const value = useMemo<CartContextValue>(() => {
    const count = items.reduce((sum, entry) => sum + entry.quantity, 0);
    const subtotal = items.reduce((sum, entry) => sum + entry.unitPrice * entry.quantity, 0);
    const installationTotal = items.reduce(
      (sum, entry) =>
        sum + (entry.installation ? entry.installationPrice * entry.quantity : 0),
      0,
    );

    return {
      items,
      count,
      subtotal,
      installationTotal,
      total: subtotal + installationTotal,
      isOpen,
      settings,
      customerName,
      setCustomerName,
      setOpen: setIsOpen,
      openCart: () => setIsOpen(true),
      closeCart: () => setIsOpen(false),
      add,
      remove,
      setQuantity,
      clear,
    };
  }, [
    items,
    isOpen,
    settings,
    customerName,
    setCustomerName,
    add,
    remove,
    setQuantity,
    clear,
  ]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart(): CartContextValue {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart debe usarse dentro de CartProvider");
  }
  return context;
}
