
export const SizeOptions = Object.freeze({
    Small: 0,
    Medium: 1,
    Large: 2,
});


export const ButtonOptions = Object.freeze({
    Size: {
        Small: 'btn-sm',
        Medium: 'btn-md',
        Large: 'btn-lg',
        Square: 'btn-square btn-lg',
        Wide: 'btn-wide',
    },
    State: {
        None: '',
        Info: 'btn-info',
        Warning: 'btn-warning',
        Success: 'btn-success',
        Danger: 'btn-danger',
        Disabled: 'btn-disabled',
    },
    Style: {
        Outlined: 'btn-outline',
        Filled: 'btn-primary', // Default filled style
        Ghost: 'btn-ghost',
    },
    Behavior: {
        Default: '',
        Loading: '',
        Checkable: 'btn-checkable',
    },
});
