/* @flow */
/* eslint fp/no-class:0 */

import React from 'react';
import Relay from 'react-relay/classic';
import { connect } from 'react-redux';
import { parse } from 'query-string';

import { handleStateChange } from '@ncigdc/dux/relayProgress';
import GenePage from '@ncigdc/containers/GenePage';
import { parseIntParam, parseFilterParam } from '@ncigdc/utils/uri';
import NotFound from '@ncigdc/components/NotFound';

import { nodeAndViewerQuery } from './queries';

class GeneRoute extends Relay.Route {
  static routeName = 'GenePageRoute';
  static queries = nodeAndViewerQuery;
  static prepareParams = ({ location: { search }, match: { params } }) => {
    const q = parse(search);
    const qq: Object = {
      ...q,
      filters: parseFilterParam(q.filters, null),
    };

    return {
      id: btoa(`Gene:${params.id}`),
      fmTable_offset: parseIntParam(q.fmTable_offset, 0),
      fmTable_size: parseIntParam(q.fmTable_size, 10),
      fmTable_filters: parseFilterParam(q.fmTable_filters, null),
      ...qq,
    };
  };
}

export default connect()((routeProps: mixed) =>
  <Relay.Renderer
    Container={GenePage}
    queryConfig={new GeneRoute(routeProps)}
    environment={Relay.Store}
    onReadyStateChange={handleStateChange(routeProps)}
    render={({ error, props }) => {
      if (error) {
        return <NotFound />;
      } else if (props) {
        return <GenePage {...props} />;
      }
      return undefined;
    }}
  />,
);
