import { RefinementList } from 'react-instantsearch-hooks-web';

const fixedOrder = ['Easy', 'Medium', 'Hard'];

const CustomRefinementList = () => (
  <RefinementList
    attribute="difficulty"
    transformItems={(items) =>
      items.sort((a, b) => fixedOrder.indexOf(a.label) - fixedOrder.indexOf(b.label))
    }
  />
);

export default CustomRefinementList;
