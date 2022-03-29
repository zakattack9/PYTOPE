import { BlockType, CommandOutputAssertionType, TestDesigns } from "../utils/test-designer"

export const designer : TestDesigns = {
    "docker_images": {
        "docker_image1": {
            "docker_image_id": 1,
            "docker_image_description": "Base git Docker image",
            "tests": [
                "test1",
                "test2"
            ]
        },
        "docker_image2": {
            "docker_image_id": 2,
            "docker_image_description": "Base git Docker image with cloned repository",
            "tests": [
                "test3"
            ]
        }
    },
    "tests": {
        "test1": {
            "test_id": 1,
            "test_blocks": [
                {
                    "block_type": BlockType.RUN,
                    "command": "git commit -m 'initial commit'",
                    "command_output_assertion": CommandOutputAssertionType.NO_VERIFY
                }
            ]
        },
        "test2": {
            "test_id": 2,
            "test_blocks": [
                {
                    "block_type": BlockType.RUN,
                    "command": "git add .",
                    "command_output_assertion": CommandOutputAssertionType.VERIFY_EMPTY
                }
            ]
        },
        "test3": {
            "test_id": 3,
            "test_blocks": [
                {
                    "block_type": BlockType.RUN,
                    "command": "git commit -am 'new commit'",
                    "command_output_assertion": CommandOutputAssertionType.NO_VERIFY
                },
                {
                    "block_type": BlockType.RUN,
                    "command": "git push",
                    "command_output_assertion": CommandOutputAssertionType.VERIFY_REGEX,
                    "regex": "/some_regex/g"
                }
            ]
        }
    }
}

