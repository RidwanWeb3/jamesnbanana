import { useEffect, useState } from "react";

export function AppKitButton() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return null; // Don't render anything on server
  }

  // eslint-disable-next-line react/no-unknown-property
  return <appkit-button balance="hide" size="sm" />;
}
