export async function isRecordExist(model, data, trx) {
    const record = await model.findOne({ where: { ...data }, transaction: trx });

    return record !== null;
}
