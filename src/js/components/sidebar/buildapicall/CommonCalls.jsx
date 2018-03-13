import React from 'react';
import PropTypes from 'prop-types';

import {COMMON_CALLS} from 'scripts/constants'


export default class CommonCalls extends React.Component{

    static propTypes = {
        endpoint: PropTypes.string.isRequired,
        updateParams: PropTypes.func
    }

    componentWillMount(){
        const {endpoint} = this.props;
        let endpointUCase = endpoint.toUpperCase();
        this.renderDropDownOptions(endpointUCase);
    }

    componentWillReceiveProps(nextProps){
        const {endpoint} = nextProps;
        if(endpoint !== this.props.endpoint){
            let endpointUCase = endpoint.toUpperCase();
            this.renderDropDownOptions(endpointUCase);
        }
    }

    renderDropDownOptions(endpoint){
        let dropDownOptions = COMMON_CALLS[endpoint].map(call => {
            let index = call.TITLE.replace(/ /g, '-').toLowerCase();
            return(
                <option key={index}
                        value={index}>
                        {call.TITLE}
                </option>
            )
        });

        let dropDownDefaultStr = 'SELECT A CALL';
        let dropDownDefault = dropDownDefaultStr.replace(/ /g, '-').toLowerCase();

        dropDownOptions.unshift(
            <option disabled
                    key={dropDownDefault}
                    value={dropDownDefault}>
                    {dropDownDefaultStr}
            </option>
        );

        this.setState({
            dropDownOptions: dropDownOptions,
            dropDownValue: dropDownDefault 
        });
    }

    changeHandler = (evt) => {
        const {endpoint} = this.props;
        const selElement = evt.target;
        const optionText = selElement.options[selElement.selectedIndex].text

        this.props.updateParams(endpoint, optionText);
        this.setState({ dropDownValue: selElement.value });
    }

    render(){
        const {endpoint} = this.props;
        const {dropDownOptions, dropDownValue} = this.state;

        return(
            <div>
                <label htmlFor="api-call-selector">Common {endpoint} API Calls</label>
                <select id="api-call-selector"
                        value={dropDownValue}
                        className="u-full-width"
                        onChange={this.changeHandler}>
                        {dropDownOptions}
                </select>
            </div>
        )
    }
}



