import { render, screen } from '@testing-library/react';

import { NavigationItem } from './NavigationItem';

describe('NavigationItem', () => {
  const href = '/test';
  const label = 'Test Page';

  it('should render successfully', () => {
    render(<NavigationItem href={href} label={label} isCurrentPage={false} />);
    const linkElement = screen.getByText(label);
    expect(linkElement).toBeInTheDocument();
  });

  it('should display the label passed as a prop', () => {
    render(<NavigationItem href={href} label={label} isCurrentPage={false} />);
    expect(screen.getByTestId('NavigationItem_link')).toHaveTextContent(label);
  });

  it('should have the correct href attribute', () => {
    render(<NavigationItem href={href} label={label} isCurrentPage={false} />);
    expect(screen.getByTestId('NavigationItem_link')).toHaveAttribute('href', href);
  });
});
