import { Children, useEffect, useLayoutEffect, useRef, useState } from 'react';
import { createPortal } from 'react-dom';
import { ChevronDown } from 'lucide-react';

export default function ResponsiveSelect({ value, onChange, className = '', children, disabled = false, ...props }) {
  const [isOpen, setIsOpen] = useState(false);
  const [menuStyle, setMenuStyle] = useState(null);
  const triggerRef = useRef(null);
  const menuRef = useRef(null);
  const options = Children.toArray(children)
    .filter((child) => child?.type === 'option')
    .map((child) => ({
      value: String(child.props.value ?? child.props.children),
      label: child.props.children,
      disabled: child.props.disabled,
    }));
  const selectedOption = options.find((option) => option.value === String(value)) ?? options[0];

  useLayoutEffect(() => {
    if (!isOpen || !triggerRef.current) return undefined;

    const updateMenuPosition = () => {
      const rect = triggerRef.current.getBoundingClientRect();
      const viewportPadding = 8;
      const width = Math.min(rect.width, window.innerWidth - viewportPadding * 2);
      const left = Math.min(Math.max(rect.left, viewportPadding), window.innerWidth - width - viewportPadding);
      const spaceBelow = window.innerHeight - rect.bottom - viewportPadding;
      const spaceAbove = rect.top - viewportPadding;
      const openAbove = spaceBelow < 220 && spaceAbove > spaceBelow;
      const maxHeight = Math.max(120, Math.min(280, (openAbove ? spaceAbove : spaceBelow) - 8));

      setMenuStyle({
        position: 'fixed',
        zIndex: 2147483647,
        left,
        width,
        maxHeight,
        ...(openAbove
          ? { bottom: window.innerHeight - rect.top + 4 }
          : { top: rect.bottom + 4 }),
      });
    };

    updateMenuPosition();
    window.addEventListener('resize', updateMenuPosition);
    window.addEventListener('scroll', updateMenuPosition, true);
    return () => {
      window.removeEventListener('resize', updateMenuPosition);
      window.removeEventListener('scroll', updateMenuPosition, true);
    };
  }, [isOpen]);

  useEffect(() => {
    if (!isOpen) return undefined;
    const closeOnOutsideClick = (event) => {
      if (!triggerRef.current?.contains(event.target) && !menuRef.current?.contains(event.target)) {
        setIsOpen(false);
      }
    };
    const closeOnEscape = (event) => {
      if (event.key === 'Escape') {
        setIsOpen(false);
        triggerRef.current?.focus();
      }
    };
    document.addEventListener('pointerdown', closeOnOutsideClick);
    document.addEventListener('keydown', closeOnEscape);
    return () => {
      document.removeEventListener('pointerdown', closeOnOutsideClick);
      document.removeEventListener('keydown', closeOnEscape);
    };
  }, [isOpen]);

  const handleOptionKeyDown = (event, index) => {
    const buttons = menuRef.current?.querySelectorAll('[role="option"]');
    if (!buttons?.length) return;
    if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
      event.preventDefault();
      const direction = event.key === 'ArrowDown' ? 1 : -1;
      buttons[(index + direction + buttons.length) % buttons.length].focus();
    } else if (event.key === 'Home' || event.key === 'End') {
      event.preventDefault();
      buttons[event.key === 'Home' ? 0 : buttons.length - 1].focus();
    }
  };

  return (
    <>
      <button
        {...props}
        ref={triggerRef}
        type="button"
        disabled={disabled}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        className={`responsive-select-trigger ${className}`}
        onClick={() => setIsOpen((open) => !open)}
        onKeyDown={(event) => {
          if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
            event.preventDefault();
            setIsOpen(true);
            requestAnimationFrame(() => menuRef.current?.querySelector('[role="option"]')?.focus());
          }
        }}
      >
        <span className="responsive-select-value">{selectedOption?.label ?? ''}</span>
        <ChevronDown aria-hidden="true" className={`responsive-select-chevron ${isOpen ? 'rotate-180' : ''}`} />
      </button>
      {isOpen && menuStyle && createPortal(
        <div
          ref={menuRef}
          role="listbox"
          className="responsive-select-menu"
          style={menuStyle}
        >
          {options.map((option, index) => (
            <button
              key={`${option.value}-${index}`}
              type="button"
              role="option"
              aria-selected={option.value === String(value)}
              disabled={option.disabled}
              className="responsive-select-option"
              onKeyDown={(event) => handleOptionKeyDown(event, index)}
              onClick={() => {
                onChange?.({ target: { value: option.value } });
                setIsOpen(false);
                triggerRef.current?.focus();
              }}
            >
              {option.label}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </>
  );
}
