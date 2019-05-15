import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

import { setSortColumn } from '../../redux/actions/actions';

const actions = {
  setSortColumn
};

const sortColumnsBy = [
  'Title',
  'Description',
  'Director',
  'Genre',
  'ReleaseYear'
];

const SortColumnDropdown = props => {
  return (
    <DropdownButton
      drop={'left'}
      alignRight={false}
      size="sm"
      variant="outline-secondary"
      className="mb-1"
      id="dropdown-item-button"
      title="Sort by"
      onSelect={e => props.setSortColumn(e)}
      style={{ textAlign: 'right' }}
    >
      {sortColumnsBy.map(name => (
        <Dropdown.Item key={name} eventKey={name} as="button">
          {name}
        </Dropdown.Item>
      ))}
    </DropdownButton>
  );
};

SortColumnDropdown.propTypes = {
  setSortColumn: PropTypes.func.isRequired
};

export default connect(
  null,
  actions
)(SortColumnDropdown);
