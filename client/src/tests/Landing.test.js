
import { render, screen } from '@testing-library/react';
import Landing from '../pages/Landing';
import backgroundImage from "../images/landing-bg.jpg";
import { Link, MemoryRouter } from 'react-router-dom';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';

configure({ adapter: new Adapter() });


describe('Landing', () => {
    let wrapper;

    beforeEach(() => {
        wrapper = mount(
            <MemoryRouter initialEntries={['/']}>
                <Landing />
            </MemoryRouter>
        );
    })

    it('Should render a image', () => {
        expect(wrapper.find({alt: "background"}).props().style.backgroundImage).toEqual('url(landing-bg.jpg)')
    });
    
    it('Should render a link to explore all breeds', () => {
        expect(wrapper.find(Link)).toHaveLength(1)
        expect(wrapper.find(Link).props().to).toEqual('/breeds')
    });
});
