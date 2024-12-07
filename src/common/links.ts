export function openLink(link: string, event: Event | null = null) {
    if (event) {
        event.stopPropagation();
        event.preventDefault();
    }
    window.location.href = link;
}