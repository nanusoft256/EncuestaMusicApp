import { Constants } from '../components/shared/constants';

export abstract class EncuestaConstants {
  static readonly URL_PATH_ENCUESTAS: string = Constants.API_URL + 'encuestas';
  static readonly URL_PATH_CANTIDAD_GENERO_MUSICAL: string = Constants.API_URL + 'cantidad-por-genero-musical';
}