
export function getElementAttribute(
    doc,
    selector,
    attr = "textContent",
    defaultValue = "",
) {
    const element = doc.querySelector(selector);
    return element
        ? attr === "textContent"
            ? element.textContent
            : element.getAttribute(attr)
        : defaultValue;
}

export function emitEvent(eventName, data) {
    const event = new CustomEvent(
        eventName,
        data !== null ? { detail: data } : null,
    );
    window.document.dispatchEvent(event);
}