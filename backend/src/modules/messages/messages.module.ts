import { Module, Controller, Post, Get, Param, Body, UseGuards, Req, Injectable } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { PrismaService } from '../../common/prisma.module';

@Injectable()
class MessagesService {
  constructor(private readonly prisma: PrismaService) {}

  async getOrCreateThread(clientId: string, lawyerId: string) {
    return this.prisma.messageThread.upsert({
      where: { clientId_lawyerId: { clientId, lawyerId } },
      update: {},
      create: { clientId, lawyerId },
    });
  }

  async send(senderId: string, threadId: string, content: string) {
    return this.prisma.message.create({ data: { senderId, threadId, content } });
  }

  async list(threadId: string) {
    return this.prisma.message.findMany({
      where: { threadId },
      orderBy: { createdAt: 'asc' },
    });
  }
}

@ApiTags('messages')
@ApiBearerAuth()
@UseGuards(AuthGuard('jwt'))
@Controller('messages')
class MessagesController {
  constructor(private readonly svc: MessagesService) {}

  @Post('thread')
  openThread(@Req() req: any, @Body() dto: { lawyerId: string }) {
    return this.svc.getOrCreateThread(req.user.userId, dto.lawyerId);
  }

  @Post(':threadId')
  send(@Req() req: any, @Param('threadId') threadId: string, @Body() dto: { content: string }) {
    return this.svc.send(req.user.userId, threadId, dto.content);
  }

  @Get(':threadId')
  list(@Param('threadId') threadId: string) {
    return this.svc.list(threadId);
  }
}

@Module({ controllers: [MessagesController], providers: [MessagesService] })
export class MessagesModule {}
