
export const SizeOptions = Object.freeze({
    Small: 0,
    Medium: 1,
    Large: 2,
});

export const ButtonOptions = Object.freeze({
    Round: {
        None: '',
        Full: 'rounded-full',
        Medium: 'rounded-md',
        Small: 'rounded-sm', // Add small roundness for more flexibility
    },
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
        Secondary: 'btn-secondary',
        Primary: 'btn-primary',
        Ghost: 'btn-ghost border-2 border-transparent hover:border-current', // Ghost button improvement
    },
    Behavior: {
        Default: 0,
        Loading: 1,
        Checkable: 2,
    },
});

