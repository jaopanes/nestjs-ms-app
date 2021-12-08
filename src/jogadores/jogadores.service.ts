import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name)
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    await this.criar(criarJogadorDto);
  }

  private criar(criarJogadorDto: CriarJogadorDto): void {
    const { nome, telefoneCelular, email } = criarJogadorDto

    const jogador: Jogador = {
      _id: uuid(),
      nome,
      telefoneCelular,
      email,
      ranking: 'A',
      posicaoRanking: 1,
      urlFoto: ""
    }

    this.logger.log(`criar: ${JSON.stringify(jogador)}`)
    this.jogadores.push(jogador)
  }
}
