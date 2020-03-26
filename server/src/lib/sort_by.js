function sort_by ({ sort_by = '', sort_desc = 'true' }) {
  const sort_desc_string = sort_desc === 'false' ? '' : ' DESC'
  return sort_by + sort_desc_string
}

module.exports =  { sort_by }