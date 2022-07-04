import React, {useEffect} from 'react';
import {View} from 'react-native';
import * as TalkRn from '@talkjs/react-native';

export default function ChatBox({navigation, route}) {
  const {me, other: userSelect} = route.params;

  const other = {
    id: userSelect.id,
    name: userSelect.name,
    email: userSelect.email,
    photoUrl: userSelect.photoUrl,
    welcomeMessage: userSelect.welcomeMessage,
    role: userSelect.role,
  };

  const conversationBuilder = TalkRn.getConversationBuilder(
    TalkRn.oneOnOneId(me, other),
  );

  conversationBuilder.setParticipant(me);
  conversationBuilder.setParticipant(other);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: userSelect.name,
    });
  }, [navigation, route.params]);

  return (
    <View style={{flex: 1}}>
      <TalkRn.Session appId="tym5Seze" me={me}>
        <TalkRn.Chatbox
          showChatHeader={false}
          conversationBuilder={conversationBuilder}
        />
      </TalkRn.Session>
    </View>
  );
}
