// pages/channel/[channelId].tsx
import { useEffect, useRef } from "react";
import { useRouter } from "next/router";

// Declare JitsiMeetExternalAPI globally
declare global {
  interface Window {
    JitsiMeetExternalAPI: any;
  }
}

export default function Channel() {
  const router = useRouter();
  const { channelId } = router.query;
  const jitsiContainerRef = useRef<HTMLDivElement>(null);
  const jitsiInstanceRef = useRef<any>(null); // Store Jitsi instance

  useEffect(() => {
    if (!channelId || !jitsiContainerRef.current) return;

    const loadJitsi = () => {
      if (window.JitsiMeetExternalAPI && !jitsiInstanceRef.current) {
        const domain = "meet.jit.si";
        const options = {
          roomName: channelId,
          parentNode: jitsiContainerRef.current,
          width: "100%",
          height: "100vh",
        };

        jitsiInstanceRef.current = new window.JitsiMeetExternalAPI(domain, options);
      }
    };

    if (typeof window !== "undefined" && !window.JitsiMeetExternalAPI) {
      const script = document.createElement("script");
      script.src = "https://meet.jit.si/external_api.js";
      script.async = true;
      script.onload = loadJitsi;
      document.body.appendChild(script);
    } else {
      loadJitsi();
    }

    return () => {
      // Cleanup Jitsi instance on component unmount
      if (jitsiInstanceRef.current) {
        jitsiInstanceRef.current.dispose();
        jitsiInstanceRef.current = null;
      }
    };
  }, [channelId]);

  return <div ref={jitsiContainerRef} style={{ width: "100%", height: "100vh" }} />;
}
