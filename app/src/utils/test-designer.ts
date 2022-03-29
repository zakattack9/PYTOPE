



export interface TestDesigns {
    test_designs: String[],
    docker_images: DockerImages,
    tests: Tests
}
export interface DockerImages {
    [docker_image: string]: DockerImage
}
export interface DockerImage {
    docker_image_id: number,
    docker_image_description: string,
    tests: String[]
}
export interface Tests {
    [test: string]: Test
}
export interface Test {
    test_id: number,
    test_blocks: TestBlock[]
}
export interface TestBlock {
    block_type: BlockType,
    command: String,
    command_output_assertion: CommandOutputAssertionType,
    regex?: String
}
export enum BlockType {
    RUN = "RUN",
    ENV = "ENV",
    BKG_S = "BKG_S",
    BKG_T = "BKG_T"
}
export enum CommandOutputAssertionType {
    NO_VERIFY = "NO_VERIFY",
    VERIFY_EMPTY = "VERIFY_EMPTY",
    VERIFY_REGEX = "VERIFY_REGEX"
}
