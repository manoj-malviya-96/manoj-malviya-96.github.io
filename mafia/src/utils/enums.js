
export const BentoboxSizeOption = Object.freeze({
    Regular: 0,
    Tall: 1,
    Wide: 2,
    Large: 3,
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


export const DropdownOptions = Object.freeze({
    Direction: {
        Down: 'dropdown-end',
        Up: 'dropdown-top',
    },
    Behavior: {
        Default: '',
        Hovered: 'dropdown-hover',
    },
    Style: {
        Ghost: 'btn-ghost',
        Primary: 'btn-primary',
        Outlined: 'btn-outline',
        Secondary: 'btn-secondary',
    },
    Size: {
        Small: 'btn-sm',
        Medium: 'btn-md',
        Large: 'btn-lg',
    },
});

