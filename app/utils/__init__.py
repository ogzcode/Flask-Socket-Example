def get_model_columns(model, exclude=None):
    columns = model.__table__.columns

    if exclude is None:
        exclude = []

    return [column.name for column in columns if column.name not in exclude and not column.info.get('foreign_keys')]

def get_missing_keys(data, model, exclude=None):
    table_keys = get_model_columns(model, exclude=exclude)
    return [key for key in table_keys if key not in data]
