import { NavigationItem } from './NavigationItem';

import { render, screen } from '@testing-library/react';

describe('NavigationItem', () => {
  it('should render the label', () => {
    render(<NavigationItem href="/foo" label="Foo" isCurrentPage={false} />);
    expect(screen.getByText('Foo')).toBeInTheDocument();
  });
});
