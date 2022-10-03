import { render, screen } from '@testing-library/react';
import Index from "../../pages/index.page"

describe('index', () => {
    it('should render the index', () => {
        render(<Index comics={[]} total={0} />)
        const heading = screen.getByRole('heading', {
            name: /MARVEL/i,
        })
        expect(heading).toBeInTheDocument()
    })
})