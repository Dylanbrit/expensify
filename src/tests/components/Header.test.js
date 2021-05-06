import { shallow } from 'enzyme'
import React from 'react'
import Header from '../../components/Header'
// react-test-renderer is a library that allows us to render components inside regular JS code and we can assert something about what got rendered
// snapshots allow us to track changes to data over time
// enzyme is a renderer for React released by Airbnb, it is a full featured renderer

test('should render Header correctly', () => {
    const wrapper = shallow(<Header />)
    expect(wrapper).toMatchSnapshot()

    // expect(wrapper.find('h1').text()).toBe('Expensify')
    // const renderer = new ReactShallowRenderer()
    // renderer.render(<Header />)
    // expect(renderer.getRenderOutput()).toMatchSnapshot()
})