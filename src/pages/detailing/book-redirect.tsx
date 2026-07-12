import { useEffect } from "react";

/** Redirect legacy broken nested URL to correct booking path */
export default function DetailingBookRedirect() {
  useEffect(() => {
    window.location.replace("/detailing/book");
  }, []);
  return null;
}
