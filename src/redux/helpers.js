/* eslint-disable import/prefer-default-export */
export const handleItems = (state, { payload }) => {
  // 加载第一页，直接返回获取的数据
  if (state.length <= 0) {
    return payload;
  }

  const [lastItem, ...items] = [...state].reverse();
  const nextItem = payload[0];

  // 加载后续页，且无需要拼合的情况
  if (lastItem.title !== nextItem.title) {
    return [...state, ...payload];
  }

  // 需要把当前最后一项和后续页第一项合并
  return [
    ...items.reverse(),
    { ...lastItem, entries: [...lastItem.entries, ...nextItem.entries] },
    ...payload.slice(1),
  ];
};
