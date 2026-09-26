type VimeoPlayerInstance = {
  play: () => Promise<void>;
  pause: () => Promise<void>;
  setMuted: (muted: boolean) => Promise<void>;
  setLoop: (loop: boolean) => Promise<void>;
  setVolume: (volume: number) => Promise<void>;
  destroy: () => void;
  on: (event: string, callback: (...args: unknown[]) => void) => void;
  off: (event: string, callback?: (...args: unknown[]) => void) => void;
};

type VimeoNamespace = {
  Player: new (
    element: HTMLIFrameElement | HTMLElement,
    options?: {
      id?: string | number;
      url?: string;
      autopause?: boolean;
      autoplay?: boolean;
      background?: boolean;
      controls?: boolean;
      loop?: boolean;
      muted?: boolean;
      playsinline?: boolean;
      responsive?: boolean;
      title?: boolean;
      byline?: boolean;
      portrait?: boolean;
      dnt?: boolean;
    }
  ) => VimeoPlayerInstance;
};

declare global {
  interface Window {
    Vimeo?: VimeoNamespace;
  }
}

let apiPromise: Promise<void> | null = null;

/** Loads the Vimeo Player API once and resolves when `window.Vimeo.Player` is ready. */
export function loadVimeoPlayerAPI(): Promise<void> {
  if (typeof window === "undefined") {
    return Promise.reject(new Error("Vimeo Player API requires a browser"));
  }

  if (window.Vimeo?.Player) {
    return Promise.resolve();
  }

  if (apiPromise) return apiPromise;

  apiPromise = new Promise<void>((resolve, reject) => {
    const existing = document.querySelector<HTMLScriptElement>(
      'script[src="https://player.vimeo.com/api/player.js"]'
    );

    const onReady = () => {
      if (window.Vimeo?.Player) resolve();
      else reject(new Error("Vimeo Player API loaded without Vimeo.Player"));
    };

    if (existing) {
      if (window.Vimeo?.Player) {
        resolve();
        return;
      }
      existing.addEventListener("load", onReady, { once: true });
      existing.addEventListener(
        "error",
        () => {
          apiPromise = null;
          reject(new Error("Failed to load Vimeo Player API"));
        },
        { once: true }
      );
      return;
    }

    const script = document.createElement("script");
    script.src = "https://player.vimeo.com/api/player.js";
    script.async = true;
    script.onload = onReady;
    script.onerror = () => {
      apiPromise = null;
      reject(new Error("Failed to load Vimeo Player API"));
    };
    document.head.appendChild(script);
  });

  return apiPromise;
}

export type { VimeoPlayerInstance, VimeoNamespace };
