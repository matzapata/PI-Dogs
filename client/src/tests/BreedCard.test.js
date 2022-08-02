
import { render, screen } from '@testing-library/react';
import data from "./utils/db.json";
import BreedCard from '../components/BreedCard';
import { MemoryRouter } from 'react-router-dom';

describe('Detail card', () => {
    it('Should render all dog details', () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <BreedCard breed={data.dogDetail} />
            </MemoryRouter>
        );

        expect(screen.getByText(/Alaskan Malamute/i)).toBeInTheDocument();
        expect(screen.getByText(/Weight: 29 - 45 kg/i)).toBeInTheDocument();
        expect(screen.getByText(/Friendly, Affectionate/i)).toBeInTheDocument();
    });

    it("Should render link to breed detail", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <BreedCard breed={data.dogDetail} />
            </MemoryRouter>
        );

        expect(screen.getAllByRole('link').length).toBe(2)
        expect(screen.getAllByRole('link')[0].href.replace('http://localhost', '')).toBe('/breeds/9')
        expect(screen.getAllByRole('link')[1].href.replace('http://localhost', '')).toBe('/breeds/9')
    });

    it("Should render dog image", () => {
        render(
            <MemoryRouter initialEntries={['/']}>
                <BreedCard breed={data.dogDetail} />
            </MemoryRouter>
        );

        expect(screen.getByRole('img')).toBeInTheDocument()
        expect(screen.getByRole('img').src).toBe(data.dogDetail.image)
    })
});

