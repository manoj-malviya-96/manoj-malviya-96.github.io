

export function openLink(link, event = null) {
    if (event){
        event.stopPropagation();
        event.preventDefault();
    }
    window.location.href = link;
}