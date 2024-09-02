import { SquidService, secureDatabase, executable, secureCollection, QueryContext } from '@squidcloud/backend';

type User = { id: string; email: string; age: number };

export class ExampleService extends SquidService {
  @secureCollection('users', 'read')
  secureUsersRead(context: QueryContext<User>): boolean {
    const userAuth = this.getUserAuth();
    if (!userAuth) {
      return false;
    }
    const userId = userAuth.userId;
    return context.isSubqueryOf('id', '==', userId);
  }

  @secureDatabase('all', 'built_in_db')
  allowAccessToBuiltInDb(): boolean {
    return true;
  }

  @executable()
  async askQuestion(question: string): Promise<string> {
    const aiResponse = await this.squid
      .ai()
      .executeAiQuery('built_in_db', question);

    console.log(`
      Question: ${question}
      Query: ${aiResponse.executedQuery ?? 'No query executed'}
      Explanation: ${aiResponse.explanation ?? 'No Explanation'}`)
    
      return aiResponse.answer
  }
}
