import {
  isRouteErrorResponse,
  Links,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "react-router";

import type { Route } from "./+types/root";
import "./app.css";

export const links: Route.LinksFunction = () => [
  { rel: "preconnect", href: "https://fonts.googleapis.com" },
  {
    rel: "preconnect",
    href: "https://fonts.gstatic.com",
    crossOrigin: "anonymous",
  },
  { rel: "icon", type: "image/png", href: "/data/logo-browser-light.png" },
  {
    rel: "stylesheet",
    href: "https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap",
  },
];

export function Layout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <Meta />
        <Links />

        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function () {
                try {
                  var saved = localStorage.getItem("theme");
                  var theme = (saved === "light" || saved === "dark") ? saved : "light";
                  document.documentElement.classList.toggle("dark", theme === "dark");

                  var faviconQuery = window.matchMedia("(prefers-color-scheme: dark)");
                  var setFavicon = function (isDark) {
                    var href = isDark ? "/data/logo-browser-dark.png" : "/data/logo-browser-light.png";
                    var el = document.querySelector('link[data-dynamic-favicon="true"]');
                    if (!el) {
                      el = document.createElement("link");
                      el.setAttribute("rel", "icon");
                      el.setAttribute("type", "image/png");
                      el.setAttribute("data-dynamic-favicon", "true");
                      document.head.appendChild(el);
                    }
                    el.setAttribute("href", href + "?v=" + (isDark ? "dark" : "light"));
                  };

                  setFavicon(faviconQuery.matches);
                  if (faviconQuery.addEventListener) {
                    faviconQuery.addEventListener("change", function (e) {
                      setFavicon(e.matches);
                    });
                  } else if (faviconQuery.addListener) {
                    faviconQuery.addListener(function (e) {
                      setFavicon(e.matches);
                    });
                  }
                } catch (e) {}
              })();
            `,
          }}
        />
      </head>
      <body>
        {children}
        <ScrollRestoration />
        <Scripts />
      </body>
    </html>
  );
}

export default function App() {
  return <Outlet />;
}

export function ErrorBoundary({ error }: Route.ErrorBoundaryProps) {
  let message = "Oops!";
  let details = "An unexpected error occurred.";
  let stack: string | undefined;

  if (isRouteErrorResponse(error)) {
    message = error.status === 404 ? "404" : "Error";
    details =
      error.status === 404
        ? "The requested page could not be found."
        : error.statusText || details;
  } else if (import.meta.env.DEV && error && error instanceof Error) {
    details = error.message;
    stack = error.stack;
  }

  return (
    <main className="pt-16 p-4 container mx-auto">
      <h1>{message}</h1>
      <p>{details}</p>
      {stack && (
        <pre className="w-full p-4 overflow-x-auto">
          <code>{stack}</code>
        </pre>
      )}
    </main>
  );
}
