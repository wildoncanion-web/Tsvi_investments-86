"use client"

import Script from "next/script"

export function SmartsuppChat() {
  return (
    <Script
      id="smartsupp-chat"
      strategy="afterInteractive"
      dangerouslySetInnerHTML={{
        __html: `
          var _smartsupp = _smartsupp || {};
          _smartsupp.key = '0a26b1ab3ca7fd1fcc5979c0857bd7c5142d27b9';
          window.smartsupp||(function(d) {
            var s,c,o=smartsupp=function(){ o._.push(arguments)};o._=[];
            s=d.getElementsByTagName('script')[0];c=d.createElement('script');
            c.type='text/javascript';c.charset='utf-8';c.async=true;
            c.src='https://www.smartsuppchat.com/loader.js?';s.parentNode.insertBefore(c,s);
          })(document);
        `,
      }}
    />
  )
}
