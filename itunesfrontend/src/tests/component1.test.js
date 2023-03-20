import { render, screen } from '@testing-library/react';
import App from '../App';
import renderer from 'react-test-renderer';

test('renders the landing page', () => {
    render(<App />);
});

test('renders the main heading',  () => {
    render(<App/>);
    expect(screen.getByRole("heading", {name: /itunes Explora/, class: "mainHeading"})).toBeInTheDocument();
})

test("snapshot for App component", () => {
    const tree = renderer.create(<App/>).toJSON()
    expect(tree).toMatchSnapshot()
})

