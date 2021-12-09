import { Injectable, Logger } from '@nestjs/common';
import { CriarJogadorDto } from './dtos/criar-jogador.dto';
import { Jogador } from './interfaces/jogador.interface';
import { v4 as uuid } from 'uuid';

@Injectable()
export class JogadoresService {
  private readonly logger = new Logger(JogadoresService.name)
  private jogadores: Jogador[] = [];

  async criarAtualizarJogador(criarJogadorDto: CriarJogadorDto): Promise<void> {
    const { email } = criarJogadorDto

    const jogadorEncontrado = await this.jogadores.find(jogador => jogador.email === email)
    if (jogadorEncontrado) {
      await this.atualizar(jogadorEncontrado, criarJogadorDto)
    } else {
      await this.criar(criarJogadorDto);
    }
  }

  async consultarTodosJogadores(): Promise<Jogador[]> {
    return await this.jogadores;
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

  private atualizar(jogadorEncontrado: Jogador, criarJogadorDto: CriarJogadorDto): void {
    const { nome } = criarJogadorDto;

    jogadorEncontrado.nome = nome;
  }

}
