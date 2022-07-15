import React from 'react';
import * as TalkRn from '@talkjs/react-native';
import {View} from 'react-native-ui-lib';

export default function ConversationList({navigation, route}) {
  const {me} = route.params;
  const onSelectConversation = event => {
    navigation.navigate('ChatBox', {
      other: {...event.others[0]},
    });
  };

  return (
    <View flex>
      <TalkRn.Session appId="tym5Seze" me={me}>
        <TalkRn.ConversationList
          theme="react-native"
          onSelectConversation={onSelectConversation}
        />
      </TalkRn.Session>
    </View>
  );
}
