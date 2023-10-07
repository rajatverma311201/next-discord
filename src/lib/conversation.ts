import { db } from "@/lib";

export const getOrCreateConversation = async (
    memberOneId: string,
    memberTwoId: string,
) => {
    // console.log("GET_OR_CREATE_CONVERSATION", { memberOneId, memberTwoId });

    let conversation =
        (await findConversation(memberOneId, memberTwoId)) ||
        (await findConversation(memberTwoId, memberOneId));

    if (!conversation) {
        conversation = await createNewConversation(memberOneId, memberTwoId);
    }

    return conversation;
};

const findConversation = async (memberOneId: string, memberTwoId: string) => {
    try {
        return await db.conversation.findFirst({
            where: {
                AND: [
                    { memberOneId: memberOneId },
                    { memberTwoId: memberTwoId },
                ],
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        // console.log("FIND_CONVERSATION_ERROR", err);

        return null;
    }
};

const createNewConversation = async (
    memberOneId: string,
    memberTwoId: string,
) => {
    try {
        return await db.conversation.create({
            data: {
                memberOneId,
                memberTwoId,
            },
            include: {
                memberOne: {
                    include: {
                        profile: true,
                    },
                },
                memberTwo: {
                    include: {
                        profile: true,
                    },
                },
            },
        });
    } catch (err) {
        // console.log("CREATE_NEW_CONVERSATION_ERROR", err);
        return null;
    }
};
