// const paginate = async (model, page = 1, limit = 10) => {
//     const offset = (page - 1) * limit;

//     // Retrieve count and paginated results
//     const { count, rows } = await model.findAndCountAll({
//         offset,
//         limit
//     });

//     return {
//         total: count,
//         page,
//         limit,
//         totalPages: Math.ceil(count / limit),
//         data: rows
//     };
// };

// module.exports = paginate;

const paginate = async (model, queryOptions, page = 1, limit = 10) => {
    const offset = (page - 1) * limit;

    // Retrieve count and paginated results
    const { count, rows } = await model.findAndCountAll({
        ...queryOptions,
        offset,
        limit
    });

    return {
        total: count,
        page,
        limit,
        totalPages: Math.ceil(count / limit),
        data: rows
    };
};

module.exports = paginate;

