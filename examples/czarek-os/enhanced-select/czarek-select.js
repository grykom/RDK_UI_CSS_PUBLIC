(function (global) {
  'use strict';

  const instances = new WeakMap();
  let openInstance = null;
  let nextId = 0;

  function isDisabled(select) {
    return select.disabled || select.matches(':disabled');
  }

  function optionButtons(instance) {
    return instance.buttons.filter(button => !button.disabled);
  }

  function setActive(instance, index) {
    const available = optionButtons(instance);
    if (!available.length) {
      instance.trigger.removeAttribute('aria-activedescendant');
      return;
    }
    const target = instance.buttons[index];
    instance.activeIndex = instance.buttons.indexOf(target && !target.disabled ? target : available[0]);
    instance.buttons.forEach((button, buttonIndex) => {
      const active = buttonIndex === instance.activeIndex;
      button.toggleAttribute('data-active', active);
      if (active) instance.trigger.setAttribute('aria-activedescendant', button.id);
    });
    if (instance.open) instance.buttons[instance.activeIndex]?.scrollIntoView({ block: 'nearest' });
  }

  function sync(select) {
    const instance = instances.get(select);
    if (!instance) return;

    const selectedIndex = select.selectedIndex >= 0 ? select.selectedIndex : 0;
    const selectedOption = select.options[selectedIndex];
    instance.value.textContent = selectedOption?.textContent ?? '';
    instance.buttons.forEach((button, index) => {
      button.disabled = select.options[index]?.disabled || select.options[index]?.parentElement?.disabled || false;
      const selected = index === selectedIndex;
      button.setAttribute('aria-selected', selected ? 'true' : 'false');
      const check = button.querySelector('.cz-select-option-check');
      if (check) check.hidden = !selected;
    });

    const disabled = isDisabled(select) || !select.options.length;
    instance.trigger.disabled = disabled;
    instance.trigger.setAttribute('aria-disabled', disabled ? 'true' : 'false');
    if (disabled) close(instance);
    instance.trigger.setAttribute('aria-invalid', select.getAttribute('aria-invalid') === 'true' ? 'true' : 'false');
    if (select.getAttribute('data-dirty') === 'true') instance.trigger.setAttribute('data-dirty', 'true');
    else instance.trigger.removeAttribute('data-dirty');
    const describedBy = select.getAttribute('aria-describedby');
    if (describedBy) instance.trigger.setAttribute('aria-describedby', describedBy);
    else instance.trigger.removeAttribute('aria-describedby');
    if (!instance.open) setActive(instance, selectedIndex);
  }

  function close(instance, restoreFocus = false) {
    if (!instance?.open) return;
    instance.open = false;
    instance.menu.hidden = true;
    instance.trigger.setAttribute('aria-expanded', 'false');
    instance.trigger.removeAttribute('aria-activedescendant');
    if (openInstance === instance) openInstance = null;
    if (restoreFocus) instance.trigger.focus();
  }

  function open(instance) {
    if (instance.trigger.disabled || instance.open) return;
    if (openInstance && openInstance !== instance) close(openInstance);
    instance.open = true;
    instance.menu.hidden = false;
    instance.trigger.setAttribute('aria-expanded', 'true');
    openInstance = instance;
    setActive(instance, instance.select.selectedIndex);
  }

  function choose(instance, index) {
    const button = instance.buttons[index];
    if (!button || button.disabled) return;
    instance.select.selectedIndex = index;
    sync(instance.select);
    close(instance, true);
    instance.select.dispatchEvent(new Event('input', { bubbles: true }));
    instance.select.dispatchEvent(new Event('change', { bubbles: true }));
  }

  function create(select, index) {
    if (instances.has(select)) return instances.get(select);

    const shell = document.createElement('div');
    shell.className = 'cz-select';
    const trigger = document.createElement('button');
    trigger.type = 'button';
    trigger.id = `cz-select-trigger-${index}`;
    trigger.className = 'cz-select-trigger';
    trigger.setAttribute('role', 'combobox');
    trigger.setAttribute('aria-haspopup', 'listbox');
    trigger.setAttribute('aria-expanded', 'false');
    const labels = Array.from(select.labels || []);
    const label = labels[0];
    const accessibleName = select.getAttribute('aria-label') ||
      label?.querySelector('.rdk-label')?.textContent?.trim() ||
      label?.textContent?.trim() || 'Choose an option';
    trigger.setAttribute('aria-label', accessibleName);

    const value = document.createElement('span');
    value.className = 'cz-select-value';
    const chevron = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
    chevron.setAttribute('viewBox', '0 0 24 24');
    chevron.setAttribute('fill', 'none');
    chevron.setAttribute('stroke', 'currentColor');
    chevron.setAttribute('stroke-width', '1.8');
    chevron.setAttribute('aria-hidden', 'true');
    chevron.setAttribute('class', 'cz-select-chevron');
    chevron.innerHTML = '<path d="m7 10 5 5 5-5" stroke-linecap="round" stroke-linejoin="round"/>';
    trigger.append(value, chevron);

    const menu = document.createElement('div');
    menu.id = `cz-select-menu-${index}`;
    menu.className = 'cz-select-menu';
    menu.setAttribute('role', 'listbox');
    menu.hidden = true;
    trigger.setAttribute('aria-controls', menu.id);

    const instance = { select, shell, trigger, value, menu, buttons: [], activeIndex: 0, open: false };
    Array.from(select.options).forEach((option, optionIndex) => {
      const button = document.createElement('button');
      button.type = 'button';
      button.id = `${menu.id}-option-${optionIndex}`;
      button.className = 'cz-select-option';
      button.setAttribute('role', 'option');
      button.tabIndex = -1;
      button.disabled = option.disabled || option.parentElement?.disabled || false;
      const text = document.createElement('span');
      text.className = 'cz-select-option-text';
      text.textContent = option.textContent;
      const check = document.createElement('span');
      check.className = 'cz-select-option-check';
      check.setAttribute('aria-hidden', 'true');
      const checkIcon = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      checkIcon.setAttribute('width', '16');
      checkIcon.setAttribute('height', '16');
      checkIcon.setAttribute('viewBox', '0 0 24 24');
      checkIcon.setAttribute('fill', 'none');
      checkIcon.setAttribute('stroke', 'currentColor');
      checkIcon.setAttribute('stroke-width', '1.8');
      checkIcon.setAttribute('stroke-linecap', 'round');
      checkIcon.setAttribute('stroke-linejoin', 'round');
      checkIcon.setAttribute('aria-hidden', 'true');
      checkIcon.innerHTML = '<path d="m5 12.5 4.5 4.5L19 7"/>';
      check.append(checkIcon);
      button.append(text, check);
      button.addEventListener('mouseenter', () => setActive(instance, optionIndex));
      button.addEventListener('click', event => {
        event.preventDefault();
        choose(instance, optionIndex);
      });
      instance.buttons.push(button);
      menu.append(button);
    });

    const placeholder = document.createComment('Enhanced Select original position');
    select.before(placeholder);
    const wrappingLabel = select.closest('label');
    if (wrappingLabel) wrappingLabel.after(shell);
    else placeholder.after(shell);
    shell.append(select, trigger, menu);
    instance.placeholder = placeholder;
    instance.originalHidden = select.hidden;
    instance.labelTargets = labels.map((item) => [item, item.getAttribute('for')]);
    select.hidden = true;
    labels.forEach((item) => { item.htmlFor = trigger.id; });
    instances.set(select, instance);

    const syncFromNative = () => sync(select);
    instance.syncFromNative = syncFromNative;
    select.addEventListener('input', syncFromNative);
    select.addEventListener('change', syncFromNative);
    instance.observer = new MutationObserver(syncFromNative);
    instance.observer.observe(select, { attributes: true, attributeFilter: ['disabled', 'aria-invalid', 'data-dirty', 'aria-describedby'] });
    const fieldset = select.closest('fieldset');
    if (fieldset) instance.observer.observe(fieldset, { attributes: true, attributeFilter: ['disabled'] });

    trigger.addEventListener('click', event => {
      event.preventDefault();
      instance.open ? close(instance) : open(instance);
    });
    trigger.addEventListener('keydown', event => {
      const available = optionButtons(instance);
      if (!available.length) return;
      if (event.key === 'ArrowDown' || event.key === 'ArrowUp') {
        event.preventDefault();
        if (!instance.open) open(instance);
        else {
          const current = available.indexOf(instance.buttons[instance.activeIndex]);
          const next = Math.max(0, Math.min(current + (event.key === 'ArrowDown' ? 1 : -1), available.length - 1));
          setActive(instance, instance.buttons.indexOf(available[next]));
        }
      } else if (event.key === 'Home' || event.key === 'End') {
        event.preventDefault();
        if (!instance.open) open(instance);
        setActive(instance, instance.buttons.indexOf(event.key === 'Home' ? available[0] : available[available.length - 1]));
      } else if (event.key === 'Enter' || event.key === ' ') {
        event.preventDefault();
        if (!instance.open) open(instance);
        else choose(instance, instance.activeIndex);
      } else if (event.key === 'Escape' && instance.open) {
        event.preventDefault();
        close(instance);
      } else if (event.key === 'Tab') {
        close(instance);
      }
    });

    sync(select);
    return instance;
  }

  function init(root = document) {
    const selects = root.matches?.('select[data-cz-select]')
      ? [root]
      : root.querySelectorAll('select[data-cz-select]');
    selects.forEach((select, index) => create(select, `${nextId++}-${index}`));
    syncAll(root);
  }

  function syncAll(root = document) {
    const selects = root.matches?.('select[data-cz-select]')
      ? [root]
      : root.querySelectorAll('select[data-cz-select]');
    selects.forEach(sync);
  }

  function destroy(select) {
    const instance = instances.get(select);
    if (!instance) return;
    close(instance);
    instance.observer.disconnect();
    select.removeEventListener('input', instance.syncFromNative);
    select.removeEventListener('change', instance.syncFromNative);
    instance.placeholder.replaceWith(select);
    select.hidden = instance.originalHidden;
    instance.labelTargets.forEach(([item, target]) => {
      if (target === null) item.removeAttribute('for');
      else item.setAttribute('for', target);
    });
    instance.shell.remove();
    instances.delete(select);
  }

  document.addEventListener('pointerdown', event => {
    if (openInstance && !openInstance.shell.contains(event.target)) close(openInstance);
  });

  global.CzarekSelect = { init, sync, syncAll, destroy };
  if (document.readyState === 'loading') document.addEventListener('DOMContentLoaded', () => init());
  else init();
})(window);
