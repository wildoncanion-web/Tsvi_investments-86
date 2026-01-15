"use client"

import { useEffect } from "react"

export function SmartsuppChat() {
  useEffect(() => {
    const script = document.createElement("script")
    script.type = "text/javascript"
    script.async = true
    script.innerHTML = `
      var _smartsupp = _smartsupp || {};
      _smartsupp.key = '0a26b1ab3ca7fd1fcc5979c0857bd7c5142d27b9';
      window.smartsupp||(function(d) {
        var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
        s=d.getElementsByTagName('script')[0];c=d.createElement('script');
        c.type='text/javascript';c.charset='utf-8';c.async=true;
        c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
      })(document);
    `
    document.head.appendChild(script)

    return () => {
      document.head.removeChild(script)
    }
  }, [])

  return null
}
