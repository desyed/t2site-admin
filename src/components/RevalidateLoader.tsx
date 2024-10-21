import { useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// Function to trigger the revalidation event from anywhere in the app
export const triggerRevalidate = () => {
  const event = new Event('revalidate');
  window.dispatchEvent(event);
};

export default function RevalidateLoader() {
  const navigate = useNavigate();
  const buttonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleRevalidate = () => {
      if (buttonRef.current) {
        // Programmatically trigger the button's click event
        buttonRef.current.click();
      }
    };

    // Add an event listener for the custom "revalidate" event
    window.addEventListener('revalidate', handleRevalidate);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener('revalidate', handleRevalidate);
    };
  }, []);

  return (
    <button
      ref={buttonRef}
      onClick={() => {
        // Trigger the navigate function when the button is clicked
        navigate(window.location.pathname, { replace: true });
      }}
      className="hidden"
    >
      <div className="sr-only">Revalidate Button</div>
    </button>
  );
}
