import {Meteor} from 'meteor/meteor';
import React from 'react';
import expect from 'expect';
import {mount} from 'enzyme';

import {PrivateHeader} from './PrivateHeader';

if (Meteor.isClient) {

    describe('PrivateHeader', function () {

        it('should set button text to logout', function () {
            const wrapper = mount( <PrivateHeader title="Test Title" handleLogout={() =>{}}/> )
            const buttonText = wrapper.find('button').text()

            expect(buttonText).toBe('Log out');
        });

        it('should use title in H1 tag', function () {
            const title = "test title here";
            const wrapper = mount( <PrivateHeader title={title} handleLogout={() =>{}}/> )
            const h1 = wrapper.find('h1').text()

            expect(h1).toBe(title);
        });

        // it('should call the function', function () {
        //     const spy = expect.createSpy();
        //     spy(4, 4, 23);
        //     spy('Serks');
        //     expect(spy).toHaveBeenCalledWith('Serks');
        // });

        it('should call handleLogout on click', function () {
            const spy = expect.createSpy();
            const wrapper = mount( <PrivateHeader title="Title" handleLogout={spy}/> )
            wrapper.find('button').simulate('click');
            expect(spy).toHaveBeenCalled();
        });


    });

}