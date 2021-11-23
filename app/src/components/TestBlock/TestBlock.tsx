import React, { Component } from 'react';
import './TestBlock.scss';

class TestBlock extends Component {
    render() {
        return (
            <div className='TestBlock'>
                <div className='TestBlock__Contents'>
                    Test Block 
                    </div>
            </div>
        );
    }
}

export default TestBlock;