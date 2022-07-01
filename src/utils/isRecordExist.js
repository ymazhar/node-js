export async function isRecordExist(model, data) {
    try {
        const record = await model.findOne({ where: { ...data } });

        return record !== null;
    } catch (error) {
        throw new Error(error);
    }
}
