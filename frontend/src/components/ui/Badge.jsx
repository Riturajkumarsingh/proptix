const Badge = ({ children, variant = 'primary', dot = false, className = '' }) => {
  const variantClass = {
    primary:  'badge-primary',
    success:  'badge-success',
    warning:  'badge-warning',
    danger:   'badge-danger',
    info:     'badge-info',
    accent:   'badge-accent',
    neutral:  'badge-neutral',
  }[variant] || 'badge-neutral';

  return (
    <span className={`badge ${variantClass} ${className}`}>
      {dot && (
        <span
          style={{
            width: '6px', height: '6px', borderRadius: '50%',
            backgroundColor: 'currentColor', display: 'inline-block', marginRight: '2px',
          }}
        />
      )}
      {children}
    </span>
  );
};

// Status badge helper
export const StatusBadge = ({ status }) => {
  const config = {
    AVAILABLE:  { variant: 'success', label: 'Available' },
    RESERVED:   { variant: 'warning', label: 'Reserved' },
    BOOKED:     { variant: 'info',    label: 'Booked' },
    SOLD:       { variant: 'danger',  label: 'Sold' },
    REGISTERED: { variant: 'primary', label: 'Registered' },
    POSSESSED:  { variant: 'accent',  label: 'Possessed' },
    BLOCKED:    { variant: 'neutral', label: 'Blocked' },
    ACTIVE:     { variant: 'success', label: 'Active' },
    INACTIVE:   { variant: 'neutral', label: 'Inactive' },
    SUSPENDED:  { variant: 'danger',  label: 'Suspended' },
    PENDING:    { variant: 'warning', label: 'Pending' },
    CONFIRMED:  { variant: 'success', label: 'Confirmed' },
    CANCELLED:  { variant: 'danger',  label: 'Cancelled' },
    COMPLETED:  { variant: 'info',    label: 'Completed' },
    NEW:        { variant: 'info',    label: 'New' },
    WON:        { variant: 'success', label: 'Won' },
    LOST:       { variant: 'danger',  label: 'Lost' },
    PAID:       { variant: 'success', label: 'Paid' },
    OVERDUE:    { variant: 'danger',  label: 'Overdue' },
    OPEN:       { variant: 'info',    label: 'Open' },
    RESOLVED:   { variant: 'success', label: 'Resolved' },
    PUBLISHED:  { variant: 'success', label: 'Published' },
    DRAFT:      { variant: 'neutral', label: 'Draft' },
  };
  const { variant, label } = config[status] || { variant: 'neutral', label: status };
  return <Badge variant={variant} dot>{label}</Badge>;
};

export default Badge;
