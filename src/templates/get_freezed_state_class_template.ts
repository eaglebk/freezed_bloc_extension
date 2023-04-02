import { pascalCase } from "change-case";
import extensionConfig from "../config/config";
import { Bloc } from "../model/bloc";

export function getFreezedStateClassTemplate(bloc: Bloc) {
  return `part of '${bloc.blocFileName}';

enum ${generateStatus(bloc)} {
  initial,
  loading,
  success,
  failure;

  bool get isInitial => this == ${generateStatus(bloc)}.initial;
  bool get isLoading => this == ${generateStatus(bloc)}.loading;
  bool get isSuccess => this == ${generateStatus(bloc)}.success;
  bool get isFailure => this == ${generateStatus(bloc)}.failure;
}

@freezed
class ${bloc.stateNameAsPascal} with _\$${bloc.stateNameAsPascal} {
  const factory ${bloc.stateNameAsPascal}({
  @Default(${generateStatus(bloc)}.initial) ${generateStatus(bloc)} status,
  }) = _${bloc.stateNameAsPascal};
}`;
}

function generateStatus(bloc: Bloc): string {
  return bloc.stateNameAsPascal.replace("State", "Status");
}
