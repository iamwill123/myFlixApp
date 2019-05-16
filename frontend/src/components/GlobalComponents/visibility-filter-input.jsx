import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import { setFilter } from '../../redux/actions/actions';

const actions = {
  setFilter
};

const mapState = ({ visibilityFilter, sortColumn }) => ({
  visibilityFilter,
  sortColumn
});

const VisibilityFilterInput = props => {
  return (
    <Form inline>
      <FormControl
        onChange={e => props.setFilter(e.target.value)}
        value={props.visibilityFilter}
        type="text"
        placeholder={`Search by ${props.sortColumn}`}
        className="mr-sm-2"
      />
    </Form>
  );
};

VisibilityFilterInput.propTypes = {
  setFilter: PropTypes.func.isRequired,
  visibilityFilter: PropTypes.string.isRequired
};

export default connect(
  mapState,
  actions
)(VisibilityFilterInput);
