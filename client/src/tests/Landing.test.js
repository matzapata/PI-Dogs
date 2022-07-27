
import { render, screen, fireEvent } from '@testing-library/react';
import { RootComponent } from './utils/rootComponent';
import { createMemoryHistory } from "history";

describe('Landing', () => {
    it('Should render a image', () => {
        const history = createMemoryHistory();
        render(<RootComponent history={history} />);
        expect(screen.getByTestId('background').style.backgroundImage).toEqual('url(landing-bg.jpg)');

    });

    it('Should render a link to explore all breeds', async () => {
        const history = createMemoryHistory();
        render(<RootComponent history={history} />);

        expect(screen.getByText(/Explore dog breeds/i)).toBeInTheDocument();
        expect(screen.getByRole('link').href.replace('http://localhost', '')).toEqual('/breeds');

        fireEvent.click(screen.getByText(/Explore dog breeds/i));
        expect(history.location.pathname).toBe('/breeds');
    });
});

