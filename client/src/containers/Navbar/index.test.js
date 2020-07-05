// enzyme guide: https://enzymejs.github.io/enzyme/docs/guides/jest.html
// not inteded for testing user authentication, only the navbar behavior

import React, { Children } from 'react';
import { MemoryRouter } from 'react-router-dom';
import { shallow, mount, render } from 'enzyme';

import Navbar from './index';

describe('Navbar suit', function() {
   const emptyNavbar = <Navbar />;
   const noUserNavbar = <Navbar user={{}} />;
   const userNavbar = <Navbar user={{_id:"fake_id"}} />;

   const noUserMount = mount(<MemoryRouter>{ noUserNavbar }</MemoryRouter>);
   const noUserRender = render(<MemoryRouter>{ noUserNavbar }</MemoryRouter>);
   const userRender = render(<MemoryRouter>{ userNavbar }</MemoryRouter>);

   it('should error if no user prop present', function() {
      expect(() => mount(<MemoryRouter>{ emptyNavbar }</MemoryRouter>)).toThrow();
   });
   
   it('should render without throwing an error', function() {
      expect(noUserMount.exists('div')).toBe(true);
   });
  
   it('should render a signup button if no user present', function() {
      expect(noUserRender.text().indexOf('Signup')).toBeGreaterThan(-1);
   });

   it('should render a login button if no user present and in signup page', function() {
      expect(render(<MemoryRouter initialEntries={[ '/signup' ]}>{ noUserNavbar }</MemoryRouter>).text().indexOf('Login')).toBeGreaterThan(-1);
   });

   it('should not render a signup or Login buttons if user is present', function() {
      const renderedSignupPage = render(<MemoryRouter initialEntries={[ '/signup' ]}><Navbar user={{_id:"fake_id"}}/></MemoryRouter>);
      expect(renderedSignupPage.text().indexOf('Signup')).toBe(-1);
      expect(renderedSignupPage.text().indexOf('Login')).toBe(-1);
   });

   it('should render a signout user is present', function() {
      const renderedSignupPage = render(<MemoryRouter initialEntries={[ '/signup' ]}><Navbar user={{_id:"fake_id"}}/></MemoryRouter>);
      const renderedLoginPage = render(<MemoryRouter initialEntries={[ '/login' ]}><Navbar user={{_id:"fake_id"}}/></MemoryRouter>);
      const renderedHomePage = render(<MemoryRouter initialEntries={[ '/home' ]}><Navbar user={{_id:"fake_id"}}/></MemoryRouter>);
      const rendered404Page = render(<MemoryRouter initialEntries={[ '/not-existing' ]}><Navbar user={{_id:"fake_id"}}/></MemoryRouter>);
      expect(renderedSignupPage.find('[aria-label="Signout"]').length).toBeGreaterThan(0);
      expect(renderedLoginPage.find('[aria-label="Signout"]').length).toBeGreaterThan(0);
      expect(renderedHomePage.find('[aria-label="Signout"]').length).toBeGreaterThan(0);
      expect(rendered404Page.find('[aria-label="Signout"]').length).toBeGreaterThan(0);
   });

 });