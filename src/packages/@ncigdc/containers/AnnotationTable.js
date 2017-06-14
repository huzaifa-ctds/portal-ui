/* @flow */

import React from 'react';
import Relay from 'react-relay/classic';

import Table from '@ncigdc/uikit/Table';

import Pagination from '@ncigdc/components/Pagination';
import Showing from '@ncigdc/components/Pagination/Showing';
import { Row } from '@ncigdc/uikit/Flex';
import TableActions from '@ncigdc/components/TableActions';

import AnnotationTr from './AnnotationTr';

import type { TTableProps } from './types';

export const AnnotationTableComponent = (props: TTableProps) =>
  <div>
    <Row
      style={{
        backgroundColor: 'white',
        padding: '1rem',
        justifyContent: 'space-between',
      }}
    >
      <Showing
        docType="annotations"
        params={props.relay.route.params}
        total={props.hits.total}
      />
      <TableActions
        prefix="annotations"
        total={props.hits.total}
        sortKey="annotations_sort"
        endpoint="annotations"
        downloadFields={[
          'annotation_id',
          'case_id',
          'project.project_id',
          'entity_type',
          'entity_id',
          'category',
          'classification',
          'created_datetime',
        ]}
        sortOptions={[
          {
            id: 'annotation_id',
            name: 'ID',
          },
          {
            id: 'case_id',
            name: 'Case UUID',
          },
          {
            id: 'project.project_id',
            name: 'Project',
          },
          {
            id: 'entity_type',
            name: 'Entity Type',
          },
          {
            id: 'entity_id',
            name: 'Entity ID',
          },
          {
            id: 'category',
            name: 'Category',
          },
          {
            id: 'classification',
            name: 'Classification',
          },
        ]}
        tsvSelector="#annotations-table"
        tsvFilename="annotations-table.tsv"
      />
    </Row>
    <div style={{ overflowX: 'auto' }}>
      <Table
        id="annotations-table"
        headings={[
          'UUID',
          'Case UUID',
          'Project',
          'Entity Type',
          'Entity UUID',
          'Category',
          'Classification',
          'Date Created',
        ]}
        body={
          <tbody>
            {props.hits.edges.map((e, i) =>
              <AnnotationTr {...e} key={e.node.id} index={i} />,
            )}
          </tbody>
        }
      />
    </div>
    <Pagination params={props.relay.route.params} total={props.hits.total} />
  </div>;

export const AnnotationTableQuery = {
  fragments: {
    hits: () => Relay.QL`
      fragment on AnnotationConnection {
        total
        edges {
          node {
            id
            ${AnnotationTr.getFragment('node')}
          }
        }
      }
    `,
  },
};

const AnnotationTable = Relay.createContainer(
  AnnotationTableComponent,
  AnnotationTableQuery,
);

export default AnnotationTable;