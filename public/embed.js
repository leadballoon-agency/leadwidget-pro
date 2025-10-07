/**
 * YC Construction Garden Assessment Widget
 * Embeddable script with Shadow DOM isolation
 *
 * Usage:
 * <div id="yc-garden-assessment"></div>
 * <script src="https://your-cdn.com/embed.js"></script>
 */

(function() {
  'use strict';

  // Configuration
  const config = window.ycGardenConfig || {
    containerId: 'yc-garden-assessment',
    cdnBase: 'https://your-cdn.com',
    phone: '07553035444',
    email: 'marketing@ycconstructionltd.co.uk'
  };

  // Wait for DOM to be ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
  } else {
    init();
  }

  function init() {
    const container = document.getElementById(config.containerId);

    if (!container) {
      console.error(`YC Widget: Container #${config.containerId} not found`);
      return;
    }

    // Create shadow root for style isolation
    const shadow = container.attachShadow({ mode: 'open' });

    // Create iframe container
    const wrapper = document.createElement('div');
    wrapper.style.cssText = 'width: 100%; min-height: 600px; position: relative;';

    // Create iframe
    const iframe = document.createElement('iframe');
    iframe.style.cssText = 'width: 100%; height: 100vh; min-height: 600px; border: none; display: block;';
    iframe.src = `${config.cdnBase}/index.html`;
    iframe.title = 'Garden Assessment Widget';
    iframe.loading = 'lazy';

    // Handle iframe load
    iframe.addEventListener('load', function() {
      // Track widget load
      if (typeof fbq !== 'undefined') {
        fbq('track', 'ViewContent', {
          content_name: 'Garden Assessment Widget',
          content_category: 'Widget Load'
        });
      }

      // Track with Google Analytics if available
      if (typeof gtag !== 'undefined') {
        gtag('event', 'widget_load', {
          event_category: 'YC Widget',
          event_label: 'Garden Assessment'
        });
      }
    });

    // Responsive height adjustment
    window.addEventListener('message', function(event) {
      // Verify origin for security
      if (event.origin !== config.cdnBase) return;

      if (event.data.type === 'yc-widget-height') {
        iframe.style.height = event.data.height + 'px';
      }

      // Track events from widget
      if (event.data.type === 'yc-widget-event') {
        const eventData = event.data.payload;

        // Meta Pixel tracking
        if (typeof fbq !== 'undefined') {
          switch(eventData.action) {
            case 'assessment_started':
              fbq('track', 'Lead', {
                content_category: 'Assessment Started'
              });
              break;
            case 'assessment_completed':
              fbq('track', 'CompleteRegistration', {
                value: 1.00,
                currency: 'GBP'
              });
              break;
            case 'whatsapp_clicked':
              fbq('track', 'Contact', {
                content_name: 'WhatsApp Click'
              });
              break;
            case 'hot_lead':
              fbq('trackCustom', 'HotLead', eventData.data);
              break;
          }
        }

        // Google Analytics tracking
        if (typeof gtag !== 'undefined') {
          gtag('event', eventData.action, {
            event_category: 'YC Widget',
            event_label: eventData.label || '',
            value: eventData.value || 0
          });
        }
      }
    });

    wrapper.appendChild(iframe);
    shadow.appendChild(wrapper);

    console.log('YC Garden Assessment Widget loaded successfully');
  }
})();
